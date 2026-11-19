const SortSelector = ({sortBy, onSortChange}) => {
    return ( 
        <div className="controls">
            <label htmlFor="sort">Sort by</label>
            <select  id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                <option value="market_cap_desc">Market cap - high to low</option>
                <option value="market_cap_asc">Market cap - low to high</option>
                <option value="price_desc">Market price - high to low</option>
                <option value="price_asc">Market cap - low to high</option>
                <option value="change_desc">24h change - high to low</option>
                <option value="change_asc">24h change - low to high</option>
            </select>
        </div>
     );
}
 
export default SortSelector;