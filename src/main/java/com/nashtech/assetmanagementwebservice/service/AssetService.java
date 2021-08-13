package com.nashtech.assetmanagementwebservice.service;

import java.util.List;
import java.util.Map;

import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;

public interface AssetService {
	List<AssetDTO> getAssetList();
	
	AssetDTO findAssetById(Integer id);
	
	AssetDTO createAsset(Integer categoryId, AssetDTO payload);
	
	AssetDTO editAsset(Integer assetId, AssetDTO payload);
	
	void deleteAssetById(Integer id);

	List<AssetDTO> searchAssetByAssetNameOrAssetCode(String keyword);

	List<AssetDTO> filterAssets(String category, Integer state);
}
