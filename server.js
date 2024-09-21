const cors = require("cors");
const express = require("express");
const aboutRoutes = require("./routes/aboutRoutes");
const blogRoutes = require("./routes/blogRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const faqRoutes = require("./routes/faqRoutes");
const personReq = require("./routes/personReqRoutes");
const pricing = require("./routes/pricingRoutes");
const sections = require("./routes/sectionsRoutes")
const doctorRoutes = require("./routes/doctorRoutes")
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3001', 'https://topaz-backend.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Deny the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.use("/api/about", aboutRoutes);
app.use("/api/blogpost", blogRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/personReq", personReq);
app.use("/api/pricing", pricing);
app.use("/api/sections", sections);
app.use('/api/doctors', doctorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
