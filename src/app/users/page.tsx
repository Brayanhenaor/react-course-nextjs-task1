"use client";

import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type User = {
  name: string;
  phone: string;
  email: string;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    setUsers((current) => [...current, data]);
  };

  const handleDelete = (index: number) => {
    setUsers((current) => {
      return current.filter((_, i) => {
        return i !== index;
      });
    });
  };

  const handleEdit = (index: number) => {
    alert("Pending feature");
  };

  return (
    <Container
      sx={{
        p: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} gap={2}>
          <Grid>
            <TextField
              label="Nombre"
              variant="outlined"
              {...register("name", { required: true })}
            />
          </Grid>
          <Grid>{errors.name && "Nombre es requerido"}</Grid>
          <Grid>
            <TextField
              label="Telefono"
              variant="outlined"
              {...register("phone", { required: true })}
            />
          </Grid>
          <Grid>{errors.phone && "Telefono es requerido"}</Grid>
          <Grid>
            <TextField
              type="email"
              label="Correo"
              variant="outlined"
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid>{errors.email && "Email es requerido"}</Grid>
          <Grid>
            <Button type="submit" variant="outlined">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
      {users.length > 0 && (
        <Grid container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Container>
  );
};

export default UsersPage;
