import React from "react";
import { Link } from "react-router-dom";

import {
    Grid,
    Typography,
    makeStyles,
    TextField,
    Button,
    IconButton,
} from "@material-ui/core";
import IconArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
    container: {
        marginLeft: "50px",
        marginRight: "50px",
    },
    form: {
        paddingLeft: "15px",
    },
    input: {
        marginBottom: "15px",
    },
    submitButton: {
        marginLeft: "auto",
        marginRight: "15px",
    },
    gridItem: {
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    dashboardLink: {
        paddingLeft: "0px",
        paddingRight: "0px",
    }
}));

export default function NewWorker() {
    const classes = useStyles();

    const [ime, setIme] = React.useState("");
    const [priimek, setPriimek] = React.useState("");

    const handleChangeIme = event => {
        setIme(event.target.value);
    }

    const handleChangePriimek = event => {
        setPriimek(event.target.value);
    }

    const handleClick = () => {
        //  Funkcija za dodajanje delavca
    }

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12}>
                <Link to="/admin/index" style={{ textDecoration: 'none' }}>
                    <IconButton
                        style={{
                            backgroundColor: "transparent",
                        }}
                        disableRipple={true}
                        disableFocusRipple={true}
                        className={classes.dashboardLink}
                    >
                        <IconArrowBack className="back-button-icon" />
                        <Typography>
                            Domov
                        </Typography>
                        
                    </IconButton>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h1">
                    Nov delavec
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.input}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Ime"
                    value={ime}
                    onChange={handleChangeIme}
                />
            </Grid>
            <Grid item xs={12} className={classes.input}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Priimek"
                    value={priimek}
                    onChange={handleChangePriimek}
                />
            </Grid>
            <Grid container className={classes.submitButton} justify="flex-end">
                <Grid item xs={12} className={classes.gridItem}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => handleClick()}
                    >
                        Dodaj
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}