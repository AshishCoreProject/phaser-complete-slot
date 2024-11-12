import { useNavigate } from "react-router-dom"
// import Button from '@mui/material/Button'

function Home(props) {
    
    const {loggedIn, email, setLoggedIn } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
          const text = "Are you sure you want to log out?"
          if(confirm(text) == true){
            localStorage.removeItem('user');
            setLoggedIn(false);
            navigate('/');
          }
          
        }else{
          navigate('/login');
        }
      }
    const handleNavigateToGame = () => {
      navigate('/game')
    }

    return (
        <div className="home-box">
            <div>
                <p className="my-6 text-6xl drop-shadow-[0_25px_15px_rgba(255,251,0)] text-[#FFFB00] font-bold animate-bounce">Welcome To Fruit Slot Game!</p>
            </div>
            {/* <div><p className="my-6 text-xl">This is home page.</p></div> */}
            <div>
                {loggedIn ? 
                    <div>
                        <div className="my-16">
                        <p className="text-4xl font-bold text-[#00CCFF]">Congrats!</p>
                        <p className="text-xl text-emerald-500">You are Successfully Login</p>
                        </div>
                        <p className="p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0)] border-4 border-double rounded-md border-slate-50">Your email address : <p className="font-bold text-blue-400 underline">{email}</p></p>
                        <button onClick={handleNavigateToGame} className="h-10 my-16 font-bold text-gray-800 rounded-lg w-36 border-1 bg-slate-50">
                          Let's Play
                        </button>
                    </div> 
                    : <div />}
                    <div className="my-16">
                    <input
                        className="w-20 p-1 bg-red-400 border-2 border-red-400 rounded cursor-pointer"
                        type='button'
                        onClick={onButtonClick}
                        value={loggedIn ? "Log out" : "Log in"}
                    />
                    </div>
            </div>
        </div>
    )
}

export default Home
