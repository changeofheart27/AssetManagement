package com.nashtech.assetmanagementwebservice.service;

import java.util.List;

import com.nashtech.assetmanagementwebservice.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.entity.Asset;

public interface AssetService {
	List<AssetDTO> getAssetList();
	
	AssetDTO findAssetById(Integer id);
	
	AssetDTO createAsset(Integer categoryId, AssetDTO payload);

	AssetDTO editAsset(AssetDTO assetDTO, Integer id);
}
