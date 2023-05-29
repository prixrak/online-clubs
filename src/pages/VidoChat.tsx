import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  ClientConfig,
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { ICameraVideoTrack } from "agora-rtc-sdk-ng";

// define config for rtc engine
const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

const appId: string = "ca4bfab4d6c14183af680af8d60ad80b"; //ENTER APP ID HERE
const token: string =
  "007eJxTYNh1uUxOp3V20O7qsKl7Pp1vy3y3bNdEzfkfRWZtW6Kdt1tSgSE50SQpLTHJJMUs2dDE0MI4Mc3MwiAxzSLFzCAxxcIg6YB2ZEpDICPDhKXBLIwMEAji8zDk5";

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) => {
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  console.log("ready", ready);

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      console.log("init", name);
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(
        appId,
        name,
        token,
        String(Math.floor(Math.random() * 1000000000))
      );
      if (tracks) await client.publish([tracks[0], tracks[1]]);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  console.log("tracks", tracks);
  console.log("users", users);
  console.log("tracks", tracks);

  return (
    <div className='App'>
      {ready && tracks && <Controls tracks={tracks} setInCall={setInCall} />}
      {tracks && tracks?.length > 0 && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { users, tracks } = props;
  console.log("tracks11111", tracks);

  return (
    <div>
      <div id='videos'>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />

        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className='vid'
                  videoTrack={user.videoTrack}
                  style={{ height: "95%", width: "95%" }}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const client = useClient();
  const { tracks, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setInCall(false);
  };

  return (
    <div className='controls'>
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}
    </div>
  );
};
const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className='join'>
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type='text'
        placeholder='Enter Channel Name'
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}>
        Join
      </button>
    </form>
  );
};

const VidoChat = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      <h1 className='heading'>Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};
export default VidoChat;
