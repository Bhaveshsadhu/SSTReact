// imports.js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as settings from "../../settings/settings";
import { fetchDataFromAPI } from "../../Components/fetchDataFromAPI ";
