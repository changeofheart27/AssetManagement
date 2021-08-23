package com.nashtech.assetmanagementwebservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nashtech.assetmanagementwebservice.entity.Asset;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AssetRepository extends JpaRepository<Asset, Integer> {
	public List<Asset> findAllByOrderByAssetName();
	public Asset findByAssetCode(String assetCode);
	//get the latest id of the asset based on their category prefix
	@Query(value = "SELECT MAX(CONVERT(SUBSTRING_INDEX(a.asset_code,c.prefix,-1), SIGNED)) as maxIdForEachCategory "
			+ "FROM asset a inner join category c on a.category_id = c.id "
			+ "WHERE c.prefix = :prefix GROUP BY c.prefix", 
			nativeQuery = true)
	public Integer getAssetMaxId(String prefix);
	
	//used for searching
	@Query(value = "SELECT a FROM Asset a WHERE a.assetName LIKE :assetName OR a.assetCode = :assetCode")
	public List<Asset> findAssetsByAssetNameContainsOrAssetCodeContains(String assetName, String assetCode);
	
	//used for filtering
	@Query("SELECT a FROM Asset a WHERE a.category.name = :category")
	public List<Asset> findAssetByCategory(String category);
	
	public List<Asset> findAssetByState(int state);
	
	@Query(value = "select \r\n"
			+ "  category.name as \"Category\", \r\n"
			+ "  count(*) as \"Total\", \r\n"
			+ "  sum(case when asset.state = 4 then 1 else 0 end) as \"Assigned\", \r\n"
			+ "  sum(case when asset.state = 0 then 1 else 0 end) as \"Available\", \r\n"
			+ "  sum(case when asset.state = 1 then 1 else 0 end) as \"Not Available\", \r\n"
			+ "  sum(case when asset.state = 2 then 1 else 0 end) as \"Waiting for recycling\", \r\n"
			+ "  sum(case when asset.state = 3 then 1 else 0 end) as \"Recycled\"\r\n"
			+ "from category \r\n"
			+ "inner join \r\n"
			+ "  asset \r\n"
			+ "on category.id = asset.category_id\r\n"
			+ "group by category.name", nativeQuery = true)
	public List<Object[]> getDataForReport();
	
}
