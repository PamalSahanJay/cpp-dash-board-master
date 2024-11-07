import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Footer © '}
      <Link color="inherit" href="https://wiley.com/">
        CCP-Dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
