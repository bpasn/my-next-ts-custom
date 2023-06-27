import { ButtonSocial,IConSocial } from '@/pages/auth/StyledAuth';
import React from 'react'

type Props = {
    social?: string;
    faIcon: string;
    onClick?:() => void
}

const ButtonSocialComponent = (props: Props) => {
    return (
        <ButtonSocial onClick={props.onClick} type='button' social={props.social} >
            <IConSocial className={'fa ' + props.faIcon} />
        </ButtonSocial>
    )
}

export default ButtonSocialComponent