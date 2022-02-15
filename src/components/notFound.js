import Typewriter from "typewriter-effect"
function NotFound(){
    return(
        <div className="d-flex align-items-center justify-content-center" style={{ "height": "80vh" }} >
        <h1>
            <Typewriter
                options={{
                    strings: ['404','Page Not Found!'],
                    autoStart: true,
                    loop: true,
                }} />
        </h1>
    </div>
    )
}
export default NotFound