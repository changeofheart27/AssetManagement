package com.nashtech.assetmanagementwebservice.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nashtech.assetmanagementwebservice.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.entity.Category;
import com.nashtech.assetmanagementwebservice.mapper.AssetMapper;
import com.nashtech.assetmanagementwebservice.repository.AssetRepository;
import com.nashtech.assetmanagementwebservice.repository.CategoryRepository;
import com.nashtech.assetmanagementwebservice.service.AssetService;

@Service
@Transactional(readOnly = true)
public class AssetServiceImpl implements AssetService {
	private final AssetRepository assetRepository;
	private final CategoryRepository categoryRepository;
	private final AssetMapper assetMapper;
	
	@Autowired
	public AssetServiceImpl(AssetRepository assetRepository, CategoryRepository categoryRepository) {
		this.assetRepository = assetRepository;
		this.categoryRepository = categoryRepository;
		this.assetMapper = new AssetMapper();
	}
	
	@Override
	@Transactional
	public List<AssetDTO> getAssetList() {
		List<Asset> assets = assetRepository.findAll();
		return assets.stream().map(assetMapper::fromEntity).collect(Collectors.toList());
	}
	
	@Override
	@Transactional
	public AssetDTO findAssetById(Integer id) {
		Asset asset = assetRepository.getById(id);
		return assetMapper.fromEntity(asset);
	}

	@Override
	@Transactional
	public AssetDTO createAsset(Integer categoryId, AssetDTO payload) {
		Asset asset = assetMapper.fromDTO(payload);
		asset.setInstalledDate(new Date());
		Category category = categoryRepository.getById(categoryId);
		asset.setCategory(category);
		String assetCode = generateAssetCode(category);
		asset.setAssetCode(assetCode);
		
		assetRepository.save(asset);
		
		return assetMapper.fromEntity(asset);
	}
	
	private String generateAssetCode(Category category) {
		String prefix = "";
		String categoryName = category.getName();
		if (categoryName.split(" ").length > 1) {
			prefix = categoryName.split(" ")[0].substring(0, 1).toUpperCase() + categoryName.split(" ")[1].substring(0, 1).toUpperCase();
		} else {
			prefix = categoryName.substring(0, 2).toUpperCase();
		}
		long count = assetRepository.count();
		String assetCode = prefix + String.format("%06d", count);
		return assetCode;
	}


}
