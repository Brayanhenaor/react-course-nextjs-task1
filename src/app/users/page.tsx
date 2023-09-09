"use client";

import {
  Button,
  Container,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";

import { User } from "@/types/user";
import { UsersTable } from "./components/Table";



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
      <UsersTable
        users={users}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
};

export default UsersPage;
