import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <main className="mt4">
            <header className="flex flex-column items-center">
                <div className="pa4 br-pill bg-near-white primary-1 fink">
                    <h1 className="f1 ma0 mr5 ts-1">Animal</h1>
                    <h1 className="f1 ma0 ml5 pr1 ts-1">Archipelago</h1>
                </div>
            </header>

            <section className="flex flex-column items-center mt4">
                <div className="pv4 bg-primary-1 br4">
                    <p className="secondary-1 mb4 ph4 measure-narrow">
                        Build an archipelago with your community to keep
                        yourselves in touch for high stalk trading!
                    </p>

                    <div className="flex flex-column items-center">
                        <Link
                            to="/register"
                            className="link primary-1 bg-tertiary-1 hover-bg-tertiary-2 btn-shadow fw8 f4 mb2 pv2 ph4 b--none br-pill"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="link secondary-1 hover-secondary-2 bg-transparent b--none fw6 f4 mt1"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
