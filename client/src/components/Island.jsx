import React from "react";

const Island = () => {
    const islanders = [
        {
            id: 1,
            name: "Riki",
            avatar_url: "avatar.jpg",
        },
        {
            id: 2,
            name: "Gab-a-tron",
            avatar_url: "avatar.jpg",
        },
    ];

    const renderResidents = () => {
        return islanders.map((islander, i) => {
            return (
                <div className="flex items-center pv2">
                    <div className="w2 h2 mr3 bg-secondary-1 br-100"></div>
                    {islander.name}
                </div>
            );
        });
    };
    return (
        <main className="mt4 flex-center flex-column">
            <header className="w-100 mw6 mh4 ph4 bg-secondary-1 br3">
                <div>
                    <h1 className="tc primary-1">Malos</h1>
                    <div className="flex-center pb3">
                        <i className="pa2 mb2 mh4 f-subheadline fas fa-globe-europe secondary-1 bg-primary-1 br3"></i>
                        <div className="grid-1-1 gap-1 mt3 mh4 self-start">
                            <span className="primary-2">Island fruit:</span>
                            <span className="primary-1">Apple</span>
                            <span className="primary-2">Hemisphere:</span>
                            <span className="primary-1">Northern</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="mt5">
                <h2 className="mb2">Residents</h2>
                <div className="residents">{renderResidents()}</div>
            </section>
        </main>
    );
};

export default Island;
