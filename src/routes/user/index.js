import express from 'express'
import { User, UserActivation, UserSession } from '../../database'
import { Crypto } from '../../utils'
import { v4 as uuidv4 } from 'uuid'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { token } = req.headers

    const userSession = await UserSession.findByPk(token)

    if (!userSession) return res.status(400).json({
      message: 'Session not found'
    })
      
    const user = await User.findOne({ where: {
      id: userSession.userId,
      status: 1
    }})

    

    if (user){
      const { id, username, email, firstName, lastName, createdAt, updatedAt } = user

      return res.json({
        message: 'user found',
        user: {
          id,
          username,
          email, 
          firstName,
          lastName,
          createdAt,
          updatedAt
        }
      })

    } else {
      return res.status(400).json({
        message: 'User not found'
      })
    }


    

  } catch (error) {
    res.send({ message: 'Error on processing...', error}).status(400)
  }
})

router.post('/register', async (req,res) => {
  try {
    const { username, email, password } = req.body

    const foundUser = await User.findOne({ where: { email }})

    if (!foundUser){
      // can create user user now
      const passwordHash = Crypto.buildHash(password)
      
      await User.create({
        username,
        email,
        status: 0,
        password: passwordHash
      })

      // create activation data
      const emailHash = Crypto.buildHash(email)
      const activationBody = {
        email,
        hash: emailHash
      }

      const activationHash = Crypto.encrypt(activationBody)

      await UserActivation.create({
        hash: emailHash,
        activated: false,
        user_email: email
      })

      return res.json({
        message: 'User created successfuly',
        activationHash
      })
    } else {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    
  } catch (error) {
    res.send({ message: 'Error on processing...', error}).status(400)
  }
})


router.post('/activate/:hash', async (req, res) => {
  try {
    console.log(req.params);
    const { hash } = req.params
    const { email, hash: emailHash} = Crypto.decrypt(hash)
    console.log(email);
    const activationFound = await UserActivation.findOne({ where: {
      user_email: email,
      hash: emailHash,
      activated: false
    }})

    if (activationFound) {
      // generate activation
      await User.update({ 
        status: 1
      }, { where: {
        email
      }})

      await UserActivation.update({
        activated: true
      }, { where: {  
        user_email: email,
        hash: emailHash
      }})

      return res.json({
        message: `User ${email} activated`
      })
    }

    return res.json({
      message: `Token activation not found`
    })

  } catch (error) {
    res.send({ message: 'Error on processing...', error}).status(400)
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const passwordHash = Crypto.buildHash(password)
    console.log(passwordHash);
    const user = await User.findOne({
      where: {
        email,
        password: passwordHash,
        status: 1
      }
    })

    if (user) {
      console.log(user);
      const generatedToken = uuidv4()

      console.log(generatedToken)

      await UserSession.create({
        token: generatedToken,
        userId: user.id
      })


      return res.json({
        message: 'User login successfuly',
        token: generatedToken
      })


    } else {
      return res.status(400).json({
        message: 'Couldnt find user'
      })
    }

  } catch (error) {
    res.send({ message: 'Error on processing...', error}).status(400)
  }
})


export default router