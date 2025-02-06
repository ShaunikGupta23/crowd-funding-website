const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const PORT = 3000;

const User = require('./models/User')

dotenv.config({ path: './config.env' })

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


require("./db/connection")

const Charity = require('./models/Charity')
const Donation = require('./models/Donate')

app.post("/register", async (req, res) => {
    try {
        const { email, password, confirmPassword, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists. Redirect to login." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            role
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to register user" });
    }
})

app.post("/login", async (req, res) => {

    const { email, password, role } = req.body;
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);

        // if(!isPasswordValid) {
        //     return res.status(401).json({ message: "Invalid password" });
        // }

        if (user.role !== role) {
            return res.status(403).json({ message: "Invalid role" });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {

        })

        return res.status(200).json({ token: token, role: user.role });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to login" })
    }

})

app.post("/addCharity", async (req, res) => {
    try {
        const charity = new Charity(req.body)
        await charity.save();
        const charities = await Charity.find();
        res.status(200).json(charities)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save charity data" })

    }
})

app.get("/charities", async (req, res) => {
    try {
        const charities = await Charity.find();
        const donations = await Donation.find();

        // Calculate total funds raised per charity
        const donationTotals = donations.reduce((acc, donation) => {
            acc[donation.charityName] = (acc[donation.charityName] || 0) + donation.amount;
            return acc;
        }, {});

        const updatedCharities = charities.map(charity => ({
            ...charity._doc,
            totalFunds: donationTotals[charity.charityName] || 0
        }));

        res.status(200).json(updatedCharities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch charities" });
    }
});

app.get("/donations", async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch donations" });
    }
})

app.post("/donateCharity", async (req, res) => {
    try {
        const donation = new Donation(req.body)
        await donation.save();
        const donations = await Donation.find();
        res.status(200).json(donations)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save donation data" })
    }
})

app.post('/reset-password', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (isSamePassword) {
            return res.status(400).json({ message: 'New password cannot be the same as the old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to reset password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})