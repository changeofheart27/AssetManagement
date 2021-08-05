package com.nashtech.assetmanagementwebservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nashtech.assetmanagementwebservice.entity.Asset;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface AssetRepository extends JpaRepository<Asset, Integer> {
	

}
