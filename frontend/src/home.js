import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import image from "./bg.jpg";
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';


const cssVariables = `
  :root {
    --header-height: 3.5rem;
  
    /* Colors */
    /* Color mode HSL(hue, saturation, lightness) */
    --hue: 152;
    --first-color: hsl(var(--hue), 24%, 32%);
    --first-color-alt: hsl(var(--hue), 24%, 28%);
    --first-color-light: hsl(var(--hue), 24%, 66%);
    --first-color-lighten: hsl(var(--hue), 24%, 92%);
    --title-color: hsl(var(--hue), 4%, 15%);
    --text-color: hsl(var(--hue), 4%, 35%);
    --text-color-light: hsl(var(--hue), 4%, 55%);
    --body-color: hsl(var(--hue), 0%, 100%);
    --container-color: #FFF;
  
    /* Font and typography */
    /* .5rem = 8px | 1rem = 16px ... */
    --body-font: 'Poppins', sans-serif;
    --big-font-size: 2rem;
    --h1-font-size: 1.5rem;
    --h2-font-size: 1.25rem;
    --h3-font-size: 1rem;
    --normal-font-size: .938rem;
    --small-font-size: .813rem;
    --smaller-font-size: .75rem;
  
    /* Font weight */
    --font-medium: 500;
    --font-semi-bold: 600;
  
    /* Margins Bottom */
    /* .5rem = 8px | 1rem = 16px ... */
    --mb-0-5: .5rem;
    --mb-0-75: .75rem;
    --mb-1: 1rem;
    --mb-1-5: 1.5rem;
    --mb-2: 2rem;
    --mb-2-5: 2.5rem;
  
    /* z index */
    --z-tooltip: 10;
    --z-fixed: 100;
  }


/* Responsive typography */
@media screen and (min-width: 968px) {
  :root {
    --big-font-size: 3.5rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: .875rem;
    --smaller-font-size: .813rem;
  }
}

/*=============== BASE ===============*/
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html{
  scroll-behavior: smooth;
}

body,
button,
input,
textarea{
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
}

body{
  margin: var(--header-height) 0 0 0;
  background-color: var(--body-color);
  color: var(--text-color);
  transition: .4s; /*For animation dark mode*/
}

button{
  cursor: pointer;
  border: none;
  outline: none;
}

h1,h2,h3{
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
}

ul{
  list-style: none;
}

a{
  text-decoration: none;
}

img{
  max-width: 100%;
  height: auto;
}

/*=============== THEME ===============*/
/*========== Variables Dark theme ==========*/
body.dark-theme{
  --first-color-dark: hsl(var(--hue), 8%, 20%);
  --title-color: hsl(var(--hue), 4%, 95%);
  --text-color: hsl(var(--hue), 4%, 75%);
  --body-color: hsl(var(--hue), 8%, 12%);
  --container-color: hsl(var(--hue), 8%, 16%);
}

/*========== Button Dark/Light ==========*/
.change-theme{
  color: var(--title-color);
  font-size: 1.15rem;
  cursor: pointer;
}

.nav__btns{
  display: inline-flex;
  align-items: center;
  column-gap: 1rem;
}

/*========== 
Color changes in some parts of 
the website, in dark theme 
==========*/

.dark-theme .steps__bg,
.dark-theme .questions{
  background-color: var(--first-color-dark);
}

.dark-theme .product__circle,
.dark-theme .footer__subscribe
.dark-theme #img-view{
  background-color: var(--container-color);
}

.dark-theme .scroll-header{
  box-shadow: 0 1px 4px hsla(var(--hue), 4%, 4%, .3);
}

/*=============== REUSABLE CSS CLASSES ===============*/
.section{
  padding: 5.5rem 0 1rem;
}

.section__title,
.section__title-center{
  font-size: var(--h2-font-size);
  margin-bottom: var(--mb-2);
  line-height: 140%;
}

.section__title-center{
  text-align: center;
}

.container{
  max-width: 968px;
  margin-left: var(--mb-1-5);
  margin-right: var(--mb-1-5);
}

.grid{
  display: grid;
}

.main{
  overflow: hidden; /*For animation*/
}

/*=============== HEADER ===============*/
.header{
  width: 100%;
  background-color: var(--body-color);
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  transition: .4s; /*For animation dark mode*/
}

/*=============== NAV ===============*/
.nav{
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__logo,
.nav__toggle,
.nav__close{
  color: var(--title-color);
}

.nav__logo{
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -1px;
  display: inline-flex;
  align-items: center;
  column-gap: .5rem;
  transition: .3s;
}

.nav__logo-icon{
  font-size: 1.15rem;
  color: var(--first-color);
}

.nav__logo:hover{
  color: var(--first-color);
}

.nav__toggle{
  display: inline-flex;
  font-size: 1.25rem;
  cursor: pointer;
}

@media screen and (max-width: 767px){
  .nav__menu{
    position: fixed;
    background-color: var(--container-color);
    width: 80%;
    height: 100%;
    top: 0;
    right: -100%;
    box-shadow: -2px 0 4px hsla(var(--hue), 24%, 15%, .1);
    padding: 4rem 0 0 3rem;
    border-radius: 1rem 0 0 1rem;
    transition: .3s;
    z-index: var(--z-fixed);
  }
}

.nav__close{
  font-size: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  cursor: pointer;
}

.nav__list{
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
}

.nav__link{
  color: var(--title-color);
  font-weight: var(--font-medium);
  transition: .3s;
}

.nav__link:hover{
  color: var(--first-color);
}

/* Show menu */
.show-menu{
  right: 0;
}

/* Change background header */
.scroll-header{
  box-shadow: 0 1px 4px hsla(var(--hue), 4%, 15%, .1);
}

/* Active link */
.active-link{
  position: relative;
  color: var(--first-color);
}

.active-link::after{
  content: '';
  position: absolute;
  bottom: -.5rem;
  left: 0;
  width: 50%;
  height: 2px;
  background-color: var(--first-color);
}

/*=============== HOME ===============*/
.home{
  padding: 3.5rem 0 2rem;
}

.home__container{
  position: relative;
  row-gap: 2rem;
}

.home__img{
  width: 200px;
  justify-self: center;
}

.home__title{
  font-size: var(--big-font-size);
  line-height: 140%;
  margin-bottom: var(--mb-1);
}

.home__description{
  margin-bottom: var(--mb-2-5);
}

.home__social{
  position: absolute;
  top: 2rem;
  right: -1rem;
  display: grid;
  justify-items: center;
  row-gap: 3.5rem;
}

.home__social-follow{
  font-weight: var(--font-medium);
  font-size: var(--smaller-font-size);
  color: var(--first-color);
  position: relative;
  transform: rotate(90deg);
}

.home__social-follow::after{
  content: '';
  position: absolute;
  width: 1rem;
  height: 2px;
  background-color: var(--first-color);
  right: -45%;
  top: 50%;
}

.home__social-links{
  display: inline-flex;
  flex-direction: column;
  row-gap: .25rem;
}

.home__social-link{
  font-size: 1rem;
  color: var(--first-color);
  transition: .3s;
}

.home__social-link:hover{
  transform: translateX(.25rem);
}

/*=============== BUTTONS ===============*/
.button{
  display: inline-block;
  background-color: var(--first-color);
  color: #FFF;
  padding: 1rem 1.75rem;
  border-radius: .5rem;
  font-weight: var(--font-medium);
  transition: .3s;
}

.button:hover{
  background-color: var(--first-color-alt);
}

.button__icon{
  transition: .3s;
}

.button:hover .button__icon{
  transform: translateX(.25rem);
}

.button--flex{
  display: inline-flex;
  align-items: center;
  column-gap: .5rem;
}

.button--link{
  color: var(--first-color);
  font-weight: var(--font-medium);
}

.button--link:hover .button__icon{
  transform: translateX(.25rem);
}

/*=============== Diagnosis ===============*/
.about__container{
  row-gap: 2rem;
}

.about__img{
  width: 280px;
  justify-self: center;
}

.about__title{
  margin-bottom: var(--mb-1);
}

.about__description{
  margin-bottom: var(--mb-2);
}

.about__details{
  display: grid;
  row-gap: 1rem;
  margin-bottom: var(--mb-2-5);
}

.about__details-description{
  display: inline-flex;
  column-gap: .5rem;
  font-size: var(--small-font-size);
}

.about__details-icon{
  font-size: 1rem;
  color: var(--first-color);
  margin-top: .15rem;
}

.drop{
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-content: center;
  justify-content: center;
}

#drop_area{
  width: 500px;
  height: 300px;
  padding: 30px;
  
  background-image: url(about.png);
  text-align: center;
  border-radius: 20px;
}

.logo-icon{
  font-size: 3.15rem;
  color: var(--first-color);
}

#img-view{
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 2px dashed #1c211f;
}

#img-view span{
  display: block;
  font-size: 11px;
  color: #777;
  margin-top: 15px;
}

/*=============== STEPS ===============*/
.steps__bg{
  background-color: var(--first-color);
  padding: 3rem 2rem 2rem;
  border-radius: 1rem;
}

.steps__container{
  gap: 2rem;
  padding-top: 1rem;
}

.steps__title{
  color: #FFF;
}

.steps__card{
  background-color: var(--container-color);
  padding: 2.5rem 3rem 2rem 1.5rem;
  border-radius: 1rem;
}

.steps__card-number{
  display: inline-block;
  background-color: var(--first-color-alt);
  color: #FFF;
  padding: .5rem .75rem;
  border-radius: .25rem;
  font-size: var(--h2-font-size);
  margin-bottom: var(--mb-1-5);
  transition: .3s;
}

.steps__card-title{
  font-size: var(--h3-font-size);
  margin-bottom: var(--mb-0-5);
}

.steps__card-description{
  font-size: var(--small-font-size);
}

.steps__card:hover .steps__card-number{
  transform: translateY(-.25rem);
}


/*Rotate icon, change color of titles and background*/
.accordion-open .questions__header,
.accordion-open .questions__content{
  background-color: var(--first-color);
}

.accordion-open .questions__item-title,
.accordion-open .questions__description,
.accordion-open .questions__icon{
  color: #FFF;
}

.accordion-open .questions__icon{
  transform: rotate(45deg);
}

/*=============== CONTACT ===============*/
.contact__container{
  row-gap: 3.5rem;
}

.contact__data{
  display: grid;
  row-gap: 2rem;
}

.contact__subtitle{
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  color: var(--text-color);
  margin-bottom: var(--mb-0-5);
}

.contact__description{
  display: inline-flex;
  align-items: center;
  column-gap: .5rem;
  color: var(--title-color);
  font-weight: var(--font-medium);
}

.contact__icon{
  font-size: 1.25rem;
}

.contact__inputs{
  display: grid;
  row-gap: 2rem;
  margin-bottom: var(--mb-2-5);
}

.contact__content{
  position: relative;
  height: 3rem;
  border-bottom: 1px solid var(--text-color-light);
}

.contact__input{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 1rem 0;
  background: none;

  color: var(--text-color);

  
  border: none;
  outline: none;
  z-index: 1;
}

.contact__label{
  position: absolute;
  top: .75rem;
  width: 100%;
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  transition: .3s;
}

.contact__area{
  height: 7rem;
}

.contact__area textarea{
  resize: none;
}

/*Input focus move up label*/
.contact__input:focus + .contact__label{
  top: -.75rem;
  left: 0;
  font-size: var(--smaller-font-size);
  z-index: 10;
}

/*Input focus sticky top label*/
.contact__input:not(:placeholder-shown).contact__input:not(:focus) + .contact__label{
  top: -.75rem;
  font-size: var(--smaller-font-size);
  z-index: 10;
}

/*=============== FOOTER ===============*/
.footer__container{
  row-gap: 3rem;
}

.footer__logo{
  display: inline-flex;
  align-items: center;
  column-gap: .5rem;
  color: var(--title-color);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: var(--mb-2-5);
  transition: .3s;
}

.footer__logo-icon{
  font-size: 1.15rem;
  color: var(--first-color);
}

.footer__logo:hover{
  color: var(--first-color);
}

.footer__title{
  font-size: var(--h3-font-size);
  margin-bottom: var(--mb-1-5);
}

.footer__subscribe{
  background-color: var(--first-color-lighten);
  padding: .75rem;
  display: flex;
  justify-content: space-between;
  border-radius: .5rem;
}

.footer__input{
  width: 70%;
  padding: 0 .5rem;
  background: none;
  color: var(--text-color);
  border: none;
  outline: none;
}

.footer__button{
  padding: 1rem;
}

.footer__data{
  display: grid;
  row-gap: .75rem;
}

.footer__information{
  font-size: var(--small-font-size);
}

.footer__social{
  display: inline-flex;
  column-gap: .75rem;
}

.footer__social-link{
  font-size: 1rem;
  color: var(--text-color);
  transition: .3s;
}

.footer__social-link:hover{
  transform: translateY(-.25rem);
}

.footer__cards{
  display: inline-flex;
  align-items: center;
  column-gap: .5rem;
}
.footer__card{
  width: 35px;
}

.footer__copy{
  text-align: center;
  font-size: var(--smaller-font-size);
  color: var(--text-color-light);
  margin: 5rem 0 1rem;
}

/*=============== SCROLL UP ===============*/
.scrollup{
  position: fixed;
  background-color: var(--first-color);
  right: 1rem;
  bottom: -30%;
  display: inline-flex;
  padding: .5rem;
  border-radius: .25rem;
  z-index: var(--z-tooltip);
  opacity: .8;
  transition: .4s;
}

.scrollup__icon{
  font-size: 1rem;
  color: #FFF;
}

.scrollup:hover{
  background-color: var(--first-color-alt);
  opacity: 1;
}

/* Show Scroll Up*/
.show-scroll{
  bottom: 3rem;
}

/*=============== SCROLL BAR ===============*/
::-webkit-scrollbar{
  width: .6rem;
  background: hsl(var(--hue), 4%, 53%);
}

::-webkit-scrollbar-thumb{
  background: hsl(var(--hue), 4%, 29%);
  border-radius: .5rem;
}

/*=============== BREAKPOINTS ===============*/
/* For small devices */
@media screen and (max-width: 320px){
  .container{
    margin-left: var(--mb-1);
    margin-right: var(--mb-1);
  }

  .home__img{
    width: 180px;
  }
  .home__title{
    font-size: var(--h1-font-size);
  }

  .steps__bg{
    padding: 2rem 1rem;
  }
  .steps__card{
    padding: 1.5rem;
  }
}

/* For medium devices */
@media screen and (min-width: 576px){
  .steps__container{
    grid-template-columns: repeat(2, 1fr);
  }

  .footer__subscribe{
    width: 400px;
  }
}

@media screen and (min-width: 767px){
  body{
    margin: 0;
  }

  .nav{
    height: calc(var(--header-height) + 1.5rem);
    column-gap: 3rem;
  }
  .nav__toggle,
  .nav__close{
    display: none;
  }
  .nav__list{
    flex-direction: row;
    column-gap: 3rem;
  }
  .nav__menu{
    margin-left: auto;
  }

  .home__container,
  .about__container,
  .contact__container,
  .footer__container{
    grid-template-columns: repeat(2, 1fr);
  }
  
  .home{
    padding: 10rem 0 5rem;
  }
  .home__container{
    align-items: center;
  }
  .home__img{
    width: 280px;
    order: 1;
  }
  .home__social{
    top: 30%;
  }


  .footer__container{
    column-gap: 3rem;
  }
  .footer__subscribe{
    width: initial;
  }
}

/* For large devices */
@media screen and (min-width: 992px){
  .container{
    margin-left: auto;
    margin-right: auto;
  }

  .section{
    padding: 8rem 0 1rem;
  }
  .section__title,
  .section__title-center{
    font-size: var(--h1-font-size);
  }

  .home{
    padding: 13rem 0 5rem;
  }
  .home__img{
    width: 350px;
  }
  .home__description{
    padding-right: 7rem;
  }

  .about__img{
    width: 380px;
  }

  .steps__container{
    grid-template-columns: repeat(3, 1fr);
  }
  .steps__bg{
    padding: 3.5rem 2.5rem;
  }
  .steps__card-title{
    font-size: var(--normal-font-size);
  }

  .footer__logo{
    font-size: var(--h3-font-size);
  }
  
  .footer__copy{
    margin: 7rem 0 2rem;
  }
}

@media screen and (min-width: 1200px){
  .home__social{
    right: -3rem;
    row-gap: 4.5rem;
  }
  .home__social-follow{
    font-size: var(--small-font-size);
  }
  .home__social-follow::after{
    width: 1.5rem;
    right: -60%;
  }
  .home__social-link{
    font-size: 1.15rem;
  }

  .about__container{
    column-gap: 7rem;
  }

  .scrollup{
    right: 3rem;
  }
} 



`;

// Create a <style> element and set its content to the CSS variables
const styleElement = document.createElement('style');
styleElement.textContent = cssVariables;

// Append the <style> element to the <head> of the document
document.head.appendChild(styleElement);



const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: 'red',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#be6a77',
    boxShadow: 'none',
    color: 'white'
  },
  loader: {
    color: '#be6a77 !important',
  }

  
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

    return (
      <div>
        <header className="header" id="header">
          <nav className="nav container">
            <a href="#" className="nav__logo">
              <i className="ri-leaf-line nav__logo-icon"></i> Potatix
            </a>
  
            <div className="nav__menu" id="nav-menu">
              <ul className="nav__list">
                <li className="nav__item">
                  <a href="#home" className="nav__link active-link">Home</a>
                </li>
                <li className="nav__item">
                  <a href="#disease" className="nav__link">Disease</a>
                </li>
                <li className="nav__item">
                  <a href="#prediction" className="nav__link">Diagnosis</a>
                </li>
              </ul>
  
              <div className="nav__close" id="nav-close">
                <i className="ri-close-line"></i>
              </div>
            </div>
  
            <div className="nav__btns">
              <i className="ri-moon-line change-theme" id="theme-button"></i>
  
              <div className="nav__toggle" id="nav-toggle">
                <i className="ri-menu-line"></i>
              </div>
            </div>
          </nav>
        </header>
  
        <main className="main">
          <section className="home" id="home">
            <div className="home__container container grid">
              <img src="bg.jpg" className="home__img" />
  
              <div className="home__data">
                <h1 className="home__title">
                  Plants will make <br /> your life better
                </h1>
                <p className="home__description">
                  Identify pests, potato disease, and more with our potato leaf diseases diagnosis. POTATIX is Potato Health Assessment uses machine learning to identify potato health problems from photos.
                </p>
                <a href="#prediction" className="button button--flex">
                  Diagnosis <i className="ri-arrow-right-down-line button__icon"></i>
                </a>
              </div>
  
              <div className="home__social">
                <span className="home__social-follow">Follow Us</span>
  
                <div className="home__social-links">
                  <a href="https://www.facebook.com/" target="_blank" className="home__social-link">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" className="home__social-link">
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a href="https://twitter.com/" target="_blank" className="home__social-link">
                    <i className="ri-twitter-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
  
          <section className="steps section container" id="disease">
          <div className="steps__bg">
  <h2 className="section__title-center steps__title">
    Types of Disease
  </h2>

  <div className="steps__container grid">
    {/* Card 1 */}
    <div className="steps__card">
      <div className="steps__card-number">01</div>
      <h3 className="steps__card-title">Early Blight</h3>
      <p className="steps__card-description">
        Early blight is primarily a disease of stressed or senescing plants. Symptoms appear first on the oldest foliage.
      </p>
    </div>

    {/* Card 2 */}
    <div className="steps__card">
      <div className="steps__card-number">02</div>
      <h3 className="steps__card-title">Late Blight</h3>
      <p className="steps__card-description">
        Late blight is controlled by eliminating cull piles and volunteer potatoes, using proper harvesting and storage practices, and applying fungicides when necessary.
      </p>
    </div>

    {/* Card 3 */}
    <div className="steps__card">
      <div className="steps__card-number">03</div>
      <h3 className="steps__card-title">Healthy</h3>
      <p className="steps__card-description">
        They're rich in vitamin C, which is an antioxidant. Potatoes were a life-saving food source in early times because the vitamin C prevented scurvy.
      </p>
    </div>
  </div>
</div>
          </section>
  
          <section className="about section container" id="prediction">
          <div className="about__data">
  <h2 className="section__title-center about__title">
    Diagnosis
  </h2>

  <div className="about__details container">
    <div className="drop">
      <label htmlFor="input-file" id="drop_area">
        <input type="file" accept="image/*" id="input-file" hidden />
        <div id="img-view" className="steps__card">
          <i className="bi bi-cloud-arrow-up-fill logo-icon"></i>
          <p>Drag and drop <br /> or<br /> click here to upload image</p>
          <span>Upload any image from desktop</span>
        </div>
      </label>
    </div>
  </div>
</div>
          </section>

          


          <section>

          <Container maxWidth={false} disableGutters={true}>
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>}
              {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>}
            </Card>
          </Grid>
          {data &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}
        </Grid >
      </Container >
    
            
          </section>






  
          <section className="contact section container" id="contact">
         <div className="contact__container grid">
  <div className="contact__box">
    <h2 className="section__title">
      Reach out to us today <br /> via any of the given <br /> information
    </h2>

    <div className="contact__data">
      <div className="contact__information">
        <h3 className="contact__subtitle">Call us for instant support</h3>
        <span className="contact__description">
          <i className="ri-phone-line contact__icon"></i>
          +977 9800000000
        </span>
      </div>

      <div className="contact__information">
        <h3 className="contact__subtitle">Write us by mail</h3>
        <span className="contact__description">
          <i className="ri-mail-line contact__icon"></i>
          potatix@email.com
        </span>
      </div>
    </div>
  </div>

  <form action="" className="contact__form">
    <div className="contact__inputs">
      {/* Email Input */}
      <div className="contact__content">
        <input type="email" placeholder=" " className="contact__input" />
        <label htmlFor="" className="contact__label">Email</label>
      </div>

      {/* Subject Input */}
      <div className="contact__content">
        <input type="text" placeholder=" " className="contact__input" />
        <label htmlFor="" className="contact__label">Subject</label>
      </div>

      {/* Message Input */}
      <div className="contact__content contact__area">
        <textarea name="message" placeholder=" " className="contact__input"></textarea>
        <label htmlFor="" className="contact__label">Message</label>
      </div>
    </div>

    <button className="button button--flex">
      Send Message
      <i className="ri-arrow-right-up-line button__icon"></i>
    </button>
  </form>
</div>
          </section>
        </main>
  
        <footer className="footer section">
          <div className="footer__container container grid">
            <div className="footer__content">
            <footer className="footer section">
  <div className="footer__container container grid">
    <div className="footer__content">
      <h3 className="footer__title">
        Subscribe to our newsletter <br /> to stay updated
      </h3>
      <div className="footer__subscribe">
        <input type="email" placeholder="Enter your email" className="footer__input" />
        <button className="button button--flex footer__button">
          Subscribe
          <i className="ri-arrow-right-up-line button__icon"></i>
        </button>
      </div>
    </div>
  </div>
</footer>

            </div>
          </div>
        </footer>
  
        <a href="#" className="scrollup" id="scroll-up">
          <i className="ri-arrow-up-fill scrollup__icon"></i>
        </a>
  
        <script src="assets/js/scrollreveal.min.js"></script>
        <script src="assets/js/main.js"></script>
      </div>
    );
  };
  


 