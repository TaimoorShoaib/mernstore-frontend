import style from './textInput.module.css'
export default function TextInput(props){
    return(
        <div className={style.inputTextWrapper}>
            <input {...props}/>
            {props.error && <p className={style.errorMessage}>{props.errormessage}</p>}
        </div>
    )
}