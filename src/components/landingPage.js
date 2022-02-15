import Typewriter from "typewriter-effect"
function LandingPage() {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ "height": "80vh" }} >
            <h1>
                <Typewriter
                    options={{
                        strings: ['Hello!', 'Welcome to the Local Twitter!', 'Assingment for SquareBoat ...','Please Login or Sign Up!'],
                        autoStart: true,
                        loop: true,
                    }} />
            </h1>
        </div>
    )
}

export default LandingPage