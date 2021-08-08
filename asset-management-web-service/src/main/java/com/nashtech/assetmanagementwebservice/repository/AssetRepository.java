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
	
	@Query("SELECT COUNT(*) FROM Asset a INNER JOIN a.category c WHERE c.id = :categoryId")
	public long count(int categoryId);
	
	//used for searching
	@Query(value = "SELECT a FROM Asset a WHERE a.assetName LIKE :assetName OR a.assetCode = :assetCode")
	public List<Asset> findAssetsByAssetNameContainsOrAssetCode(String assetName, String assetCode);
	
	//used for filtering
	@Query("SELECT a FROM Asset a WHERE a.category.name = :category")
	public List<Asset> findAssetByCategory(String category);
	
	public List<Asset> findAssetByState(int state);

}
