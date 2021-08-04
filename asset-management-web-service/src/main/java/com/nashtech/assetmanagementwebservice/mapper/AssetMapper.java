package com.nashtech.assetmanagementwebservice.mapper;

import com.nashtech.assetmanagementwebservice.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.entity.Asset;

public class AssetMapper {
	
	//map from Asset to AssetDTO
	public AssetDTO fromEntity(Asset asset) {
		AssetDTO dto = new AssetDTO();
		dto.setId(asset.getId());
		dto.setAssetCode(asset.getAssetCode());
		dto.setAssetName(asset.getAssetName());
		dto.setSpecification(asset.getSpecification());
		dto.setInstalledDate(asset.getInstalledDate());
		dto.setState(asset.getState());
		dto.setLocation(asset.getLocation());
		return dto;
	}
	
	//map from AssetDTO to Asset
	public Asset fromDTO(AssetDTO payload) {
		Asset asset = new Asset();
		asset.setAssetName(payload.getAssetName());
		asset.setSpecification(payload.getSpecification());
		asset.setState(payload.getState());
		asset.setLocation(payload.getLocation());
		return asset;
	}
			
	//used to update Asset from AssetDTO
	public Asset merge(Asset entity, AssetDTO payload) {
		entity.setAssetName(payload.getAssetName());
		entity.setSpecification(payload.getSpecification());
		entity.setInstalledDate(payload.getInstalledDate());
		entity.setState(payload.getState());
		entity.setLocation(payload.getLocation());
		return entity;
	}

}
