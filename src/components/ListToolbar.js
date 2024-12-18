import React from "react";
import { Box, TextField, MenuItem, Button,InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ToolbarComponent = ({
  searchText,
  handleSearch,
  categories,
  languages,
  selectedCategory,
  setSelectedCategory,
  selectedLanguage,
  setSelectedLanguage,
  onCreateTemplate,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginY: 2,
        alignItems: "center",
        backgroundColor: "#f5f5f5", 
        padding: "16px",  
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search templates..."
          value={searchText}
          onChange={(e) =>handleSearch(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, minWidth: 180 }} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select 
          fullWidth
          label="Category"
          size="small"
          sx={{ flexGrow: 1, minWidth: 150 }} 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Language"
          size="small"
          sx={{ flexGrow: 1, minWidth: 150 }}
          fullWidth
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined">Compare</Button>
        <Button variant="contained" onClick={onCreateTemplate}>
          Create Template
        </Button>
      </Box>
    </Box>
  );
};

export default ToolbarComponent;
