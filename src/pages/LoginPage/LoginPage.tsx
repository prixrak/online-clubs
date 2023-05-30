import { FC, useEffect } from "react";
import { useStyles } from "./LoginPage.styles";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth, useSigninCheck } from "reactfire";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { ReactComponent as MainLogo } from "@assets/logo.svg";
import { ReactComponent as MailIcon } from "@assets/mail.svg";
import { ReactComponent as PasswordIcon } from "@assets/password.svg";
import { ReactComponent as GoogleIcon } from "@assets/google.svg";
import { ReactComponent as AppleIcon } from "@assets/apple.svg";
import { ReactComponent as EarthIcon } from "@assets/earth.svg";

import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { paths } from "@constants/paths";

interface Props {}

export const LoginPage: FC<Props> = () => {
  const styles = useStyles();
  const auth = useAuth();

  const { data: signInCheckResult } = useSigninCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (signInCheckResult.signedIn) {
      navigate(paths.home);
    }
  }, [signInCheckResult.signedIn]);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <MainLogo />
        <Stack className={styles.leftBlockContent}>
          <Stack rowGap='24px' className={styles.leftBlockHeading}>
            <div className={styles.leftBlockTitle}>
              Let's have{" "}
              <span className={styles.leftBlockTitleGradient}>fun!</span>
            </div>
            <div className={styles.leftBlockSubtitle}>
              Log in to IMV to engage in thought-provoking discussions,
              <br /> connect with like-minded individuals, and explore a vibrant
              community of clubs.
            </div>
          </Stack>
          <Stack rowGap='48px' className={styles.leftBlockForm}>
            <Stack rowGap='24px'>
              <TextField
                placeholder='Email'
                type='email'
                fullWidth
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                placeholder='Password'
                type='password'
                fullWidth
                className={styles.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Button
              className={classNames(styles.btn, styles.loginBtn)}
              fullWidth
              variant='contained'>
              Log in
            </Button>
            <Stack flexDirection='row' columnGap='16px' alignItems='center'>
              <div className={styles.divider}></div>
              <div style={{ whiteSpace: "nowrap" }}>or continue with</div>
              <div className={styles.divider}></div>
            </Stack>
            <Stack flexDirection='row' columnGap='24px' alignItems='center'>
              <Button
                fullWidth
                className={classNames(
                  styles.btn,
                  styles.loginBtnUsingAnotherResource
                )}
                variant='contained'
                onClick={signIn}>
                <Stack flexDirection='row' columnGap='12px' alignItems='center'>
                  <GoogleIcon />
                  Google Account
                </Stack>
              </Button>
              <Button
                fullWidth
                className={classNames(
                  styles.btn,
                  styles.loginBtnUsingAnotherResource
                )}
                variant='contained'>
                <Stack flexDirection='row' columnGap='12px' alignItems='center'>
                  <AppleIcon />
                  Apple Account
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <div>
          Don’t have an account?{" "}
          <span className={styles.signUpLink}>Sign Up</span>
        </div>
      </div>
      <div className={styles.rightBlock}>
        <EarthIcon />
      </div>
    </div>
  );
};
