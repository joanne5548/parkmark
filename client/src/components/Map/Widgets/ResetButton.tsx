
interface ResetButtonProps {
    handleResetButtonOnClick: () => void;
}

const ResetButton = ({ handleResetButtonOnClick }: ResetButtonProps) => {
    return (
        <button
            onClick={handleResetButtonOnClick}
            className="px-2 py-1 m-2 text-center text-base opacity-90 outline-none
                rounded-lg bg-white text-black font-semibold"
        >
            Reset
        </button>
    );
};

export default ResetButton;
