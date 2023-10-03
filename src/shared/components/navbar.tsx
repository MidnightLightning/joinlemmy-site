import { ChangeEvent, linkEvent } from "inferno";
import { Link } from "inferno-router";
import { Icon } from "./icon";
import { i18n, languages } from "../i18next";
import classNames from "classnames";

const NavLink = ({ content }) => <li className="text-gray-400">{content}</li>;

const NavLinks = () => (
  <>
    <NavLink content={<Link to="/instances">{i18n.t("join_a_server")}</Link>} />
    <NavLink content={<Link to="/news">{i18n.t("news")}</Link>} />
    <NavLink content={<Link to="/apps">{i18n.t("apps")}</Link>} />
    <NavLink content={<Link to="/donate">{i18n.t("donate")}</Link>} />
    <NavLink content={<a href={`/docs/index.html`}>{i18n.t("docs")}</a>} />
    <NavLink content={<Link to="/contact">{i18n.t("contact")}</Link>} />
  </>
);

function languageList() {
  return Object.keys(i18n.services.resourceStore.data).sort();
}

function handleLanguageChange(_: any, event: ChangeEvent<HTMLSelectElement>) {
  location.href = `/?lang=${event.target.value}`;
}

export const Footer = () => <Navbar footer />;

export const Navbar = ({ footer = false }) => (
  <div className={classNames("navbar px-10", { "sticky top-[100vh]": footer })}>
    <div className="navbar-start">
      <Link className="btn btn-ghost normal-case text-xl" to="/">
        <img src="/static/assets/images/lemmy.svg" className="h-12 w-12" />
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <NavLinks />
      </ul>
    </div>
    <div className="navbar-end">
      {footer ? (
        <a className="text-sm text-gray-600 TODO sm:max-lg:hidden">
          @c Lemmy -2023. All Rights Reserved.
        </a>
      ) : (
        <>
          <select
            onChange={linkEvent(this, handleLanguageChange)}
            class="select select-ghost select-bordered text-gray-400"
          >
            {languageList().map((language, i) => (
              <option
                key={i}
                value={language}
                selected={i18n.language.startsWith(language)}
              >
                {languages.find(l => l.code.startsWith(language)).name}
              </option>
            ))}
          </select>
          <a
            className="btn btn-ghost sm:max-lg:hidden"
            href="https://github.com/LemmyNet"
          >
            <Icon icon="github" classes="w-6 h-6" />
          </a>
        </>
      )}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <Icon icon="align-right" classes="w-6 h-6" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-800 rounded-box w-52 items-center"
        >
          <NavLinks />
          <li>
            <a className="btn btn-ghost" href="https://github.com/LemmyNet">
              <Icon icon="github" classes="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
