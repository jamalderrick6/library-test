import React from "react";

const AppLayout = ({ children }) => {
    return (
        <div className="bg-milky">
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <main className="h-full">
                        <div className="relative h-full mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
