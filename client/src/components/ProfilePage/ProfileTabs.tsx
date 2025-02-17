import clsx from "clsx";
import { ReactElement, useState } from "react";

interface Tab {
    title: string;
    component: ReactElement;
    fetchFunction?: () => Promise<void>;
    length?: number;
}

interface ProfileReviewTileProps {
    tabs: Tab[];
}

const ProfileTabs = ({ tabs }: ProfileReviewTileProps) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
        if (tabs[index].fetchFunction) {
            tabs[index].fetchFunction();
        }
    };

    return (
        <div className="min-h-0 flex-1 h-full sm:flex-initial flex flex-col">
            <div className="flex flex-row w-full border-b-2 border-slate-200">
                {tabs.map((tab, index) => {
                    const currentTabIsSelected = index === selectedTab;
                    return (
                        <button
                            onClick={() => handleTabClick(index)}
                            className={clsx(
                                "flex flex-row gap-2 px-6 py-2 items-center",
                                currentTabIsSelected &&
                                    "border-b-2 mb-[-1px] border-amber-900"
                            )}
                        >
                            <div
                                className={clsx(
                                    "font-medium",
                                    currentTabIsSelected
                                        ? "text-black"
                                        : "text-slate-500"
                                )}
                            >
                                {tab.title}
                            </div>
                            {tab.length && (
                                <div
                                    className={clsx(
                                        "text-[10px] font-semibold px-2 py-[1px] rounded-md",
                                        currentTabIsSelected
                                            ? "text-white bg-amber-900"
                                            : "border-[1px] border-slate-300"
                                    )}
                                >
                                    {tab.length}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            {tabs[selectedTab].component}
        </div>
    );
};

export default ProfileTabs;
