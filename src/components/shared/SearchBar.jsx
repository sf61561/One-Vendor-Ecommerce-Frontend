

const SearchBar = () => {
    return (
        <form className="flex items-center w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Search for products..."
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input type="submit" value="Search" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" />
        </form>
    );
};

export default SearchBar;