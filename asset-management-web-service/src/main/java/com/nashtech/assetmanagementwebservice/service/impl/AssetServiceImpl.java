package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.entity.Category;
import com.nashtech.assetmanagementwebservice.exception.InternalServerException;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;

import com.nashtech.assetmanagementwebservice.model.mapper.AssetMapper;


import com.nashtech.assetmanagementwebservice.model.mapper.CategoryMapper;

import com.nashtech.assetmanagementwebservice.repository.AssetRepository;
import com.nashtech.assetmanagementwebservice.service.AssetService;
import com.nashtech.assetmanagementwebservice.service.CategoryService;

@Service
@Transactional(readOnly = false)
public class AssetServiceImpl implements AssetService {
    private final AssetRepository assetRepository;
    private final CategoryService categoryService;
    private final AssetMapper assetMapper;
    private final CategoryMapper categoryMapper;
    private static final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);

    @Autowired
    public AssetServiceImpl(AssetRepository assetRepository, CategoryService categoryService) {
        this.assetRepository = assetRepository;
        this.categoryService = categoryService;
        assetMapper = new AssetMapper();
        categoryMapper = new CategoryMapper();
    }

    @Override
    @Transactional
    public List<AssetDTO> getAssetList() {
    	logger.info("Attempting to get all Asset...");
        List<Asset> assets = assetRepository.findAll();
        logger.info("Successfully got all " + assets.size() + " Asset!");
        return assets.stream().map(assetMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AssetDTO findAssetById(Integer id) {
    	logger.info("Attempting to find Asset with id " + id + "...");
        Asset asset = assetRepository.getById(id);
        if (asset == null) {
            throw new NotFoundException("No record found with id " + id);
        }
        logger.info("Successfully found an Asset with id=" + asset.getId() + ",title=" + asset.getAssetCode() 
        + ",assetName=" + asset.getAssetName() + ",category=" + asset.getCategory().getName() + "!");
        return assetMapper.fromEntity(asset);
    }

    @Override
    @Transactional
    public AssetDTO createAsset(Integer categoryId, AssetDTO payload) {
    	logger.info("Attempting to create new Asset...");
        if (categoryId == null) {
            throw new IllegalArgumentException("Category id can not be null");
        }
        if (payload == null) {
            throw new IllegalArgumentException("Request payload can not be null");
        }
        Asset asset = assetMapper.fromDTO(payload);
        // 0 Available, 1 Not Available, 2 Waiting for recycling, 3 Recycled, 4 Assigned
        if (asset.getState() > 1) {
            throw new InternalServerException("Option is not available");
        }
        asset.setInstalledDate(LocalDate.now());
        asset.setLocation("HN");
        Category category = categoryMapper.fromDTO(categoryService.findCategoryById(categoryId));
        asset.setCategory(category);
        String assetCode = generateAssetCode(category);
        asset.setAssetCode(assetCode);

        assetRepository.save(asset);
        logger.info("Successfully created an Asset with id=" + asset.getId() + ",title=" + asset.getAssetCode() 
        + ",assetName=" + asset.getAssetName() + ",category=" + asset.getCategory().getName() + "!");
        return assetMapper.fromEntity(asset);
    }

    @Override
    public AssetDTO editAsset(Integer assetId, AssetDTO payload) {
    	logger.info("Attempting to update Asset with id " + assetId + "...");
        if (assetId == null) {
            throw new IllegalArgumentException("Asset id can not be null");
        }
        if (payload == null) {
            throw new IllegalArgumentException("Request payload can not be null");
        }
        Asset asset = assetRepository.getById(assetId);
        Asset assetEdit = assetMapper.merge(asset, payload);
        Asset assetResult = assetRepository.save(assetEdit);
        logger.info("Successfully updated an Asset with id=" + asset.getId() + ",title=" + assetResult.getAssetCode() 
        + ",assetName=" + assetResult.getAssetName() + ",category=" + assetResult.getCategory().getName() + "!");
        return assetMapper.fromEntity(assetResult);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteAssetById(Integer id) {
    	logger.info("Attempting to delete Asset with id " + id + "...");
        Asset asset = assetRepository.getById(id);
        if (asset == null) {
            throw new NotFoundException("No record found with id " + id);
        }
        // 4 Assigned => can not delete
        if (asset.getState() == 4) {
            throw new InternalServerException("Asset is current assigned to someone");
        }
        logger.info("Successfully delete an Asset with id=" + asset.getId() + "!");
        assetRepository.delete(asset);
    }

    @Override
    @Transactional(readOnly = false)
    public AssetDTO findAssetByAssetCode(String assetCode) {
        Asset asset = assetRepository.findAssetByAssetCode(assetCode);
        if (asset == null) {
            throw new NotFoundException("Ne record found with assetCode " + assetCode);
        }
        return assetMapper.fromEntity(asset);
    }

    @Override
    @Transactional(readOnly = false)
    public List<AssetDTO> findAssetByAssetName(String assetName) {
        List<Asset> assets = assetRepository.findAssetsByAssetNameContains(assetName);
        return assets.stream().map(assetMapper::fromEntity).collect(Collectors.toList());
    }

    /**
     * generate assetCode for Asset (Example format: Laptop -> LA000001,
     * Monitor: MO000001, Personal Computer: PC000001)
     *
     * @param category
     * @return String
     */
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
