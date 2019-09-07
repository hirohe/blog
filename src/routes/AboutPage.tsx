import React, {useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import { LayoutContext } from './Layout';
import SubHeader from '../components/SubHeader';
import TwitterIcon from '../components/icons/Twitter';
import GitHubIcon from '../components/icons/GitHub';

import styles from './AboutPage.module.sass';

const AboutPage: React.FC = () => {
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    const { updateTitle } = layoutContext;
    updateTitle('关于我');
  });

  return (
    <div className={styles.root}>
      <div className={styles.avatarWrapper}>
        <Avatar
          alt="hirohe"
          style={{
            width: 100,
            height: 100,
          }}
          src="https://avatars2.githubusercontent.com/u/14357567?s=400"
        />
      </div>

      <div className={styles.content}>
        <SubHeader>与我联系</SubHeader>

        <Typography>

        </Typography>
        <Grid container justify="center" spacing={4}>
          <Grid item>
            <a className={styles.chipLink} href="https://twitter.com/Heecn">
              <Chip
                icon={<TwitterIcon />}
                label="@Heecn"
                color="primary"
                onClick={()=>{}}
                classes={{
                  colorPrimary: styles.twitterPrimary
                }}
              />
            </a>
          </Grid>
          <Grid item>
            <a className={styles.chipLink} href="https://github.com/hirohe">
              <Chip
                icon={<GitHubIcon />}
                label="hirohe"
                onClick={()=>{}}
              />
            </a>
          </Grid>
          <Grid item>
            <Chip
              icon={<EmailIcon />}
              label="hesreg@hotmail.com"
              color="primary"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default AboutPage;
