import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  MenuItem,
  FormLabel,
} from "@mui/material";
import whatsappImg from "../assets/images/images.jpeg";
import { useNavigate } from "react-router-dom";

const CreateTemplatePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState("setup");
  const [formContent, setFormContent] = useState("");
  const [headerType, setHeaderType] = useState("text");
  const [headerValue, setHeaderValue] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [language, setLanguage] = useState("English");
  const [messages, setMessages] = useState([]); // State to store submitted messages
 const navigate =useNavigate()
  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleSubmit = () => {
    const newTemplate = {
      id: Math.random(), 
      name: templateName,
      category: "Category Placeholder", 
      language: language,
      status: "Active",
      messageSent: 0,
      messageOpened: 0,
      topBlockedReason: "None",
      lastEdited: new Date().toLocaleDateString('en-GB')
    };

    let existingTemplates = JSON.parse(localStorage.getItem("templates")) || [];
    existingTemplates.unshift(newTemplate); 
    localStorage.setItem("templates", JSON.stringify(existingTemplates));
    navigate(`/`)

  };
  

  const handleNext = () => {
    setSelectedOption("edit");
  };

  return (
    <div style={{ padding: "5% 20%" }}>
<AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h2 style={{ color: 'black', marginRight: 30 }}>Create Template</h2>
          <h2 style={{ color: 'black', marginRight: 30 }}>Direct7</h2>
        </Toolbar>
      </AppBar>
      <RadioGroup
        row
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        sx={{ marginTop: 3 }}
      >
        <FormControlLabel value="setup" control={<Radio />} label="Setup Template" />
        <FormControlLabel value="edit" control={<Radio />} label="Edit Template" />
      </RadioGroup>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ marginTop: 3 }}>
        <Tab label="Marketing" />
        <Tab label="Utility" />
        <Tab label="Authentication" />
      </Tabs>

      <Grid container spacing={4} sx={{ marginTop: 3 }} alignItems="start">
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Template Name and Language</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Template Name"
                fullWidth
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                fullWidth
                label="Select Language"
                variant="outlined"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Content
          </Typography>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormLabel>Header Type</FormLabel>
              <TextField
                select
                value={headerType}
                onChange={(e) => setHeaderType(e.target.value)}
                fullWidth
                label="Select Header Type"
                variant="outlined"
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="location">Location</MenuItem>
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                label="Header Value"
                fullWidth
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value)}
                disabled={headerType === "none"}
                variant="outlined"
              />
            </Grid>

            <Grid item>
              <TextField
                label="Content Text"
                multiline
                rows={4}
                fullWidth
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 3 }} justifyContent="flex-end">
            {selectedOption === "setup" && (
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              </Grid>
            )}
            {selectedOption === "edit" && (
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit for Review
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" align="center">
            Preview
          </Typography>
          <Card
            sx={{
              minWidth: 345,
              margin: "auto",
              marginTop: 2,
              backgroundImage: `url(${whatsappImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "2px solid #ccc",
              padding: 2,
            }}
          >
            <CardHeader
              title={templateName}
              subheader={headerValue}
            />
            <CardMedia
              component={headerType === "image" ? "img" : "div"}
              height="194"
              image={headerType === "image" ? headerValue : undefined}
              alt="Header"
              sx={{ borderRadius: "8px", overflow: "hidden" }}
            />
            <CardContent
              sx={{
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Typography variant="body2">
                {formContent || "Start typing to preview..."}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTemplatePage;
