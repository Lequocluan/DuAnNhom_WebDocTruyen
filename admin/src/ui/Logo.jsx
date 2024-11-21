import img from "../assets/react.svg"

function Logo(){
    return(
        <div className="styled-logo flex justify-center animate-spin-slow">
            <img src={img} alt="Logo"/>
        </div>
    )
}
export default Logo;