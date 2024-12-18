import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from "@mui/material";
import ToolbarComponent from '../components/ListToolbar';

const categories = ["Marketing", "Utility", "Authentication"];
const languages = ["English", "Spanish", "French"];

const MessageTemplatesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("lastEdited");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
    setTemplates(storedTemplates);
    setFilteredTemplates(storedTemplates);
  }, []);

  useEffect(() => {
    const filteredBySearch = templates.filter((template) =>
      template.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredByLanguage = selectedLanguage
      ? filteredBySearch.filter((template) => template.language === selectedLanguage)
      : filteredBySearch;

    setFilteredTemplates(filteredByLanguage);
  }, [searchText, selectedLanguage, templates]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortTemplates = (templates) => {
    return templates.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleCreateTemplate = () => {
    window.location.href = "/create-template";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ m: 3 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <h2 style={{ color: 'black' }}>Message Templates</h2>
          <h2 style={{ color: 'black', marginRight: 30 }}>Direct7</h2>
        </Toolbar>
      </AppBar>

      <ToolbarComponent
        searchText={searchText}
        handleSearch={handleSearch}
        categories={categories}
        languages={languages}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onCreateTemplate={handleCreateTemplate}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "name")}
                >
                  Template Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "language"}
                  direction={orderBy === "language" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "language")}
                >
                  Language
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Message Sent</TableCell>
              <TableCell>Message Opened</TableCell>
              <TableCell>Top Blocked Reason</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastEdited"}
                  direction={orderBy === "lastEdited" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "lastEdited")}
                >
                  Last Edited
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortTemplates(filteredTemplates)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((template, index) => (
                <TableRow key={index}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>{template.language}</TableCell>
                  <TableCell>{template.status}</TableCell>
                  <TableCell>{template.messageSent}</TableCell>
                  <TableCell>{template.messageOpened}</TableCell>
                  <TableCell>{template.topBlockedReason}</TableCell>
                  <TableCell>{template.lastEdited}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTemplates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default MessageTemplatesPage;
