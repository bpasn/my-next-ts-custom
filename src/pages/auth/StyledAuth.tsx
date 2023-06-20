import { Box } from "@mui/material";
import styled from "@emotion/styled/macro";
import MuiButton from '@mui/material/Button'
export const LabelForm = styled("label")({
    display: "inline-block",
    marginBottom: "0.5rem"
})
export const InputField = styled("input")({
    display: "block",
    width: "100%",
    height: "calc(1.5em + 0.75rem +2px",
    padding: '0.375rem 0.75rem',
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.5",
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRaduis: "0.25rem",
    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",

})
export const BoxAuthBackground = styled(Box)({
    backgroundImage: "linear-gradient(to top, #88d3ce 0%, #6e45e2 100%)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    display: "flex",
    alignItems: "center",
    fontFamily: '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    paddingTop: "40px",
    paddingBottom: "40px",
    height: "100%",
    overflowX: 'hidden',
    overflowY: 'auto',
    [`${LabelForm}`]: {
        color: "#3b3f5c",
        textTransform: "uppercase",
        fontSize: "13px",
    },
    [`${InputField}`]: {
        position: "relative",
        boxSizing: "border-box",
        height: "auto",
        color: "#4f5163",
        padding: "5px",
        fontSize: "16px",
        border: "none",
        background: "transparent",
        borderBottom: "1px solid #e9ecef",
    },
    [`${InputField}:focus`]: {
        outline: "none"
    }
})

export const FormGroupCustom = styled("form")({
    maxWidth: "410px",
    padding: "35px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 60px 0 rgba(29,29,31,.09)",
    width: "100%",
    margin: "auto",
    '& img': {
        verticalAlign: "middle",
        borderStyle: "none",
        textAlign: "center"
    }
})

export const SocialBox = styled(Box)({
    textAlign: "center",
    '& h5': {
        color: "#6156ce",
        marginBottom: "1.5rem",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: 1.2,
        marginTop: 0,
    }
})
interface buttonProp {
    social?: string;
}
export const ButtonSocial = styled('button')<buttonProp>((prop) => ({
    padding: "6px",
    cursor: "pointer",
    border: `1px solid ${socialColor(prop.social as string)}`,
    borderRadius: "50%",
    width: "40px",
    height: "auto",
    color: socialColor(prop.social as string),
    backgroundColor: "transparent",
    boxShadow: "none",
    textShadow: "none",
    fontSize: "14px",
    fontWeight: 400,
    withSpace: "normal",
    touchAction: "manipulation",
    willChange: "opacity,transform",
    WebkitTransition: "all .3s ease-out",
    marginBottom: "1.5rem",
    marginRight: "0.5rem",
    ":hover": {
        color: "#fff",
        backgroundColor: socialColor(prop.social as string)
    },
    '& @media (prefers-reduced-motion: reduce)': {
        transition: "none",
    }
}))

export const IConSocial = styled("i")({
    fontFamily: "FontAwesome",
    speak: "mone",
    fontStyle: "normal",
    display: "inline-block",
    fontWeight: "normal",
    fontVariant: "normal",
    textTransform: "none",
    lineHeight: 1,
    WebkitFontSmoothing: "antialiased",
    fontSize: "16px",
    padding: '5px'
})

export const Line = styled(Box)<{ side: string }>((prop) => ({
    [`${prop.side}`]: "0",
    borderTop: '1px solid #07e0c4',
    position: "absolute",
    top: "10px",
    width: "34%"
}))
//[`${Line}`]: { border: "1px solid purple"} styled parent styled
export const Division = styled(Box)({
    float: "none",
    margin: "0 auto 18px",
    overflow: "hidden",
    position: "relative",
    textAlign: "center",
    width: "100%",
    color: "#e95f2b",
    '& span': {
        fontSize: "13px",
        cursor: 'pointer'
    }

})

export const FormControlTextFied = styled(Box)({

})

export const CheckBoxCustom = styled('input')((prop) => ({
    boxSizing: "border-box",
    padding: "0",
    position: "absolute",
    zIndex: "-1",
    opacity: "0",
    overflow: "visible",
    margin: 0,
    fontFamily: "inherit",
    fontSize: "ingerit",
    lineHeight: "ingerit",

}))

export const LabelCustom = styled("label")<{ error: boolean } & {
    children?: React.ReactNode,
    color?: string;
    component?: React.ElementType<any> | undefined,
    ref?: React.Ref<unknown> | undefined;
}>(prop => {
    return ({
        textTransform: "initial",
        fontSize: "14px",
        color: prop.color ? prop.color : "#e95f2b",
        marginBottom: "16px",
        cursor: "pointer",
        position: "relative",
        verticalAlign: "top",
        display: "inline-block",
        '& a': {
            color: "#e95f2b"
        },
        '&::before': {
            borderRadius: "0.25rem",
            backgroundColor: "#dee2e6",
            border: "none",
            transition: 'background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            position: "absolute",
            top: "0.25rem",
            left: "-2.5rem",
            display: "block",
            width: "1.5rem",
            height: "1.5rem",
            pointerEvents: "none",
            content: '""',
        },
        '&::after': {
            borderRadius: "3px",
            backgroundColor: prop.error ? 'red !important' : '#dee2e6 !important',
            opacity: prop.error ? '.7' : 1,
            position: "absolute",
            top: "0.25rem",
            left: "-2.5rem",
            display: "block",
            width: "1.5rem",
            height: "1.5rem",
            content: '""',
            background: "no-repeat 50%/50% 50%",
            // [`${CheckBoxCustom}:checked`]: {

            //     bakgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")`
            // }
        },
    })
})
export const CustomBox = styled(Box)({
    position: "relative",
    display: "block",
    minHeight: "1.5rem",
    paddingLeft: "1.5rem",
    [`& ${CheckBoxCustom}:checked~${LabelCustom}::before`]: {
        color: "#fff",
        borderColor: "#007bff",
        backgroundColor: "#007bff",
        borderRadius: "0.25rem",
        border: "none",
    },
    [`& ${CheckBoxCustom}:checked~${LabelCustom}:after`]: {
        borderColor: "#007bff !important",
        backgroundColor: "#007bff !important",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e")`,
    }
})



const socialColor = (social: string) => {
    switch (social) {
        case "facebook":
            return "#1a73e9";
        case "twitter":
            return "#00b1f4";
        case "google":
            return "#e7515a"
    }
}

export const ButtonFormSubmit = styled(MuiButton)({
    color: '#fff',
    backgroundImage: 'linear-gradient(to right,#f78ca0 0,#f9748f 19%,#fd868c 60%,#fe9a8b 100%)',
    backgroundColor: '#fe9a8b',
    padding: '10px 23px',
    textShadow: 'none',
    fontSize: '14px',
    fontWeight: 400,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    touchAction: 'manipulation',
    cursor: 'pointer',
    boxShadow: '0 5px 20px 0 rgba(0,0,0,.1)',
    willChange: 'opacity,transform',
    transition: 'all .3s ease-out',
    webkitTransition: 'all .3s ease-out',
    textAlign: "center",
    width: "100%",
    borderRadius: "1.875rem",
    border: "none",
    '& :hover': {
        color: "#fff",
        textDecoration: "none",
        boxShadow: '0 5px 20px 0 rgba(0,0,0,.3)',
    },

})