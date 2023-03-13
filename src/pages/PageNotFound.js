import pageNotFoundCss from "./PageNotFound.module.css";

const PageNotFound = () => {
    return (
        <div className={pageNotFoundCss.page}>
            <h1 className={pageNotFoundCss.heading}>404</h1>
            <p className={pageNotFoundCss.text}>Couldn't find the page.</p>
        </div>
    );
};

export default PageNotFound;
