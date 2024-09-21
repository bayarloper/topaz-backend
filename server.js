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

app.use(cors());
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
