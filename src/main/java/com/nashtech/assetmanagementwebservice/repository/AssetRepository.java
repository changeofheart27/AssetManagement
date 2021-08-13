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
	
	//get the latest id of the asset based on their category prefix
	@Query(value = "SELECT MAX(CONVERT(SUBSTRING_INDEX(a.asset_code,c.prefix,-1), SIGNED)) as maxIdForEachCategory "
			+ "FROM asset a inner join category c on a.category_id = c.id "
			+ "WHERE c.prefix = :prefix GROUP BY c.prefix", 
			nativeQuery = true)
	public Integer getAssetMaxId(String prefix);
	
	//used for searching
	@Query(value = "SELECT a FROM Asset a WHERE a.assetName LIKE :assetName OR a.assetCode = :assetCode")
	public List<Asset> findAssetsByAssetNameContainsOrAssetCode(String assetName, String assetCode);
	
	//used for filtering
	@Query("SELECT a FROM Asset a WHERE a.category.name = :category")
	public List<Asset> findAssetByCategory(String category);
	
	public List<Asset> findAssetByState(int state);
	

}
