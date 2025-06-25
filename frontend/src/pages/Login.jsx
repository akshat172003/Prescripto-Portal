import React from 'react'

const Login = () => { 
  const [state, setState] = React.useState('signup')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const handleSubmit = async(event) => {
    event.preventDefault()
  }

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state=='signup'?"Create Account":"Login"}
        </p>
        <p>Please {state==='signup'? "signup":"Login"} to book appointment</p>
        {
          state==='signup' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name)} value={name} required/>
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setEmail(e.target.email)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.password)} value={password} required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==='signup'?"Create Account":"Login"}</button>
        {
          state==='signup'?
          <p>Already have an account?<span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p>:
          <p>Create a new Account?<span onClick={()=>setState('signup')} className='text-primary underline cursor-pointer'>click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login
