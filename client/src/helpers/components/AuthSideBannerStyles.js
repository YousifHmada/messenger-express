import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg-img.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    backgroundImage:
      'linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingBottom: '10.358rem', // 145px
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    textAlign: 'center',
    color: theme.palette.white,
    marginTop: '2.858rem', // 40px
    maxWidth: '22.143rem', // 310px
  },
}));
