package com.nashtech.assetmanagementwebservice.service;

import java.util.List;

import com.nashtech.assetmanagementwebservice.dto.AssetDTO;

public interface AssetService {
	List<AssetDTO> getAssetList();
	
	AssetDTO findAssetById(Integer id);
	
	AssetDTO createAsset(Integer categoryId, AssetDTO payload);
	
	AssetDTO editAsset(Integer assetId, AssetDTO payload);
	
	void deleteAssetById(Integer id);
}
