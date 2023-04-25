// @ts-nocheck
import Cookies from "js-cookie";
import { Component, onMount } from "solid-js";

import Link from "./Link";

const Sidebar: Component = () => {
  onMount(() => {
    const cookieTheme = Cookies.get("theme") || "dark";
    const themeSwitcherInput = document.querySelector("#themeSwitch");

    if (cookieTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeSwitcherInput.checked = false;
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeSwitcherInput.checked = true;
    }

    themeSwitcherInput.addEventListener("change", (e) => {
      if (e.target.checked) {
        Cookies.set("theme", "dark", { expires: 365 });
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        Cookies.set("theme", "light", { expires: 365 });
        document.documentElement.setAttribute("data-theme", "light");
      }
    });

    const cookieColor = Cookies.get("color") || "green";
    const colors = document.querySelectorAll("#colors");

    if (!cookieColor) {
      Cookies.set("color", "green", { expires: 365 });
    }

    switch (cookieColor) {
      case "green":
        document.documentElement.setAttribute("data-color", "green");
        break;
      case "blue":
        document.documentElement.setAttribute("data-color", "blue");
        break;
      case "red":
        document.documentElement.setAttribute("data-color", "red");
        break;
      case "orange":
        document.documentElement.setAttribute("data-color", "orange");
        break;
      case "pink":
        document.documentElement.setAttribute("data-color", "pink");
        break;
      case "purple":
        document.documentElement.setAttribute("data-color", "purple");
        break;
      default:
        document.documentElement.setAttribute("data-color", "green");
    }

    colors.forEach((el) => {
      el.addEventListener("click", (e) => {
        let color = e.target.attributes["data-color"].value;

        document.documentElement.setAttribute("data-color", color);
        Cookies.set("color", color, { expires: 365 });
      });
    });

    const dropdownButton = document.querySelector("#themer-dropdown-button");
    const dropdownContent = document.querySelector("#themer-dropdown-content");

    dropdownButton.addEventListener("click", (e) => {
      dropdownContent.classList.toggle("show");
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest("#themer-dropdown-content")) return;

      dropdownContent.classList.remove("show");
    });
  });

  return (
    <div class="themer-container">
      <div class="themer-dropdown">
        <svg
          class="themer-dropdown-button"
          id="themer-dropdown-button"
          width="100%"
          height="100%"
          viewBox="0 0 177 168"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
        >
          <path d="M176.5,151.875c0,-2.918 -2.369,-5.287 -5.287,-5.287l-165.926,0c-2.918,0 -5.287,2.369 -5.287,5.287l0,10.574c0,2.917 2.369,5.286 5.287,5.286l165.926,0c2.918,0 5.287,-2.369 5.287,-5.286l0,-10.574Z" />
          <path d="M176.5,78.581c0,-2.918 -2.369,-5.287 -5.287,-5.287l-165.926,0c-2.918,0 -5.287,2.369 -5.287,5.287l0,10.573c0,2.918 2.369,5.287 5.287,5.287l165.926,0c2.918,0 5.287,-2.369 5.287,-5.287l0,-10.573Z" />
          <path d="M176.5,5.287c0,-2.918 -2.369,-5.287 -5.287,-5.287l-165.926,0c-2.918,0 -5.287,2.369 -5.287,5.287l0,10.573c0,2.918 2.369,5.287 5.287,5.287l165.926,0c2.918,0 5.287,-2.369 5.287,-5.287l0,-10.573Z" />
        </svg>
        <div
          tabindex="0"
          class="themer-dropdown-content"
          id="themer-dropdown-content"
        >
          <div class="side-navbar">
            <span class="themes-container-title">Links</span>
            <Link class="navbar-link" href="/">
              Blog
            </Link>
            <Link class="navbar-link" href="/series">
              Series
            </Link>
            <Link class="navbar-link" href="/rng">
              RNG
            </Link>
            <Link class="navbar-link" href="/readme">
              Readme.md
            </Link>
          </div>
          <div class="themer-content-themes-container">
            <div class="themes-container-title">
              <span>Switch Theme</span>
            </div>
            <div class="theme-label">
              <span class="theme-switch-label">Light</span>
              <div class="theme-switcher">
                <label class="theme-switcher-container">
                  <input
                    class="theme-switcher-container-input"
                    id="themeSwitch"
                    type="checkbox"
                  />
                  <span class="theme-switcher-container-span"></span>
                </label>
              </div>
              <span class="theme-switch-label">Dark</span>
            </div>
            <div class="themes-container-title">
              <span>Pick a Color</span>
            </div>
            <div class="theme-label">
              <span
                id="colors"
                class="theme-div green"
                data-color="green"
              ></span>
              <span id="colors" class="theme-div blue" data-color="blue"></span>
              <span id="colors" class="theme-div red" data-color="red"></span>
              <span
                id="colors"
                class="theme-div orange"
                data-color="orange"
              ></span>
              <span id="colors" class="theme-div pink" data-color="pink"></span>
              <span
                id="colors"
                class="theme-div purple"
                data-color="purple"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
