import Avatar from '@material-ui/core/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button, Container, Typography } from '@mui/material';
import { Form, redirect, useNavigate } from 'react-router-dom';
import ButtonSubmit from '../components/generics/ButtonSubmit';
import TextFieldGeneric from '../components/generics/TextFieldGeneric';
import { updateUserByUsername } from '../services/userService';

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateUserByUsername(params.username, updates);
  return redirect('/');
}

export default function UpdatePassword() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <BorderColorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Form method="put" id="update-pass">
          <Box sx={{ mt: 1 }}>
            <span>New Password</span>
            <TextFieldGeneric
              placeholder="Enter New Password"
              aria-label="New Password"
              type="password"
              name="password"
            />
            <ButtonSubmit label="Update" />
            <Button
              type="button"
              color="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Form>
      </Box>
    </Container>
  );
}
