import { MoreVertOutlined } from '@mui/icons-material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Avatar, Box, CardHeader, CardMedia, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import dateTimeFormatter from '../../utils/dateTimeFormatter';
import ButtonOutlined from '../common/Button/Outlined';

export default function UserCard({ user }) {
  const [showBlog, setShowBlog] = useState(true);
  const { id, avatar, username, email, createdAt, updatedAt } = user;
  const navigate = useNavigate();
  const { authUser: currentUser, setAuthUser, setIsLoggedIn } = useAuth();

  const handleShowBlogs = () => {
    if (showBlog) navigate(`blogs/${id}`);
    else navigate(-1);
    setShowBlog(!showBlog);
  };

  return (
    <Card className="userCard" key={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="User">
            M
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertOutlined />
          </IconButton>
        }
        title={
          <Typography
            variant="h6"
            component="div"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#863812',
            }}
          >
            {username}
          </Typography>
        }
        subheader={
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <b>Member since:</b> {dateTimeFormatter(createdAt)}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="1024 px"
        image={avatar}
        alt="User Cover Photo"
        title="Cat"
      />
      <CardContent>
        <Grid container rowSpacing={0}>
          <Grid item xs={8}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EmailRoundedIcon
                sx={{ color: '#863812', width: 30, marginRight: '10px' }}
              />
              <span>{email}</span>
            </div>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <b>Password Last Updated:</b> {dateTimeFormatter(updatedAt)}
            </Typography>
          </Grid>
        </Grid>
        <CardActions>
          <ButtonOutlined onClick={handleShowBlogs}>
            {showBlog ? 'Show' : 'Hide'} Blogs
          </ButtonOutlined>
          {currentUser === username ? (
            <Box display="flex">
              <Form action="update">
                <ButtonOutlined>Update Password</ButtonOutlined>
              </Form>
              <Form
                method="post"
                onSubmit={(event) => {
                  // eslint-disable-next-line no-restricted-globals
                  if (
                    !confirm('Please confirm you want to delete this record.')
                  ) {
                    event.preventDefault();
                  }
                  setAuthUser(null);
                  setIsLoggedIn(false);
                }}
              >
                <ButtonOutlined>Delete Account</ButtonOutlined>
              </Form>
            </Box>
          ) : null}
        </CardActions>
      </CardContent>
    </Card>
  );
}
