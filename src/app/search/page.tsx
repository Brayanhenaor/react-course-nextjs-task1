"use client"
import { PexelsResponse } from "@/types/search";
import { constants } from "@/utils/constants";
import { Container, ImageList, ImageListItem, TextField, styled, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchPage = () => {
  const search = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [images, setImages] = useState<string[]>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = search.current?.value;
    if (value !== null && value !== "") {
      searchImages(value!)
    }
  }

  const searchImages = async (search: string) => {
    const response = await axios.get<PexelsResponse>(`https://api.pexels.com/v1/search?query=${search}`,
      {
        headers: {
          'Authorization': constants.apiKey
        }
      })

    if (response.data != null) {
      setImages(response.data.photos.map(photo => photo.src.original))
    }
  }

  return (
    <Container sx={{ p: 2 }}>
      <Grid container>

        <Grid container xs={12} justifyContent={'center'} sx={{ pb: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField inputRef={search} variant="outlined" label="Busqueda" />
          </form>
        </Grid>

        <Grid container gap={1} justifyContent={'center'}>
          <ImageList cols={matches ? 3 : 2}>

            {
              images.map(image => (
                <ImageListItem key={image}>
                  <img src={image} />
                </ImageListItem>
              ))
            }
          </ImageList>
        </Grid>
      </Grid>
    </Container >
  );
};

export default SearchPage;
