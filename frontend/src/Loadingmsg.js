import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <LinearProgress color="secondary" />
      </ThemeProvider>
      <LinearProgress />
    </div>
  );
}
