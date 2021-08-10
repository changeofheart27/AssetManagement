package com.nashtech.assetmanagementwebservice.service.impl;

import java.math.BigInteger;
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
        List<Asset> assets = assetRepository.findAllByOrderByAssetName();
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
            throw new IllegalArgumentException("Category id can not be nll");
        }
        if (payload == null) {
            throw new IllegalArgumentException("Request payload can not be null");
        }
        Asset asset = assetMapper.fromDTO(payload);
        // 0 Available, 1 Not Available, 2 Waiting for recycling, 3 Recycled, 4 Assigned
        if (asset.getState() > 1) {
            throw new InternalServerException("Option is not available");
        }

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
        if (asset.getState() == 3) {
            throw new InternalServerException("Asset is current assigned to someone");
        }
        logger.info("Successfully delete an Asset with id=" + asset.getId() + "!");
        assetRepository.delete(asset);
    }

    @Override
    @Transactional
    public List<AssetDTO> searchAssetByAssetNameOrAssetCode(String keyword) {

        logger.info("Attempting to search Asset with keyword " + keyword + "...");
        String assetName = "%" + keyword + "%";
        String assetCode = keyword;
        List<Asset> assets = assetRepository.findAssetsByAssetNameContainsOrAssetCode(assetName, assetCode);
        logger.info("Successfully got " + assets.size() + " Asset!");
        return assets.stream().map(assetMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<AssetDTO> filterAssetByCategory(String category) {
        logger.info("Attempting to filter Asset with Category " + category + "...");
        List<Asset> assets;
        if (category.equals("Category")) {
            assets = assetRepository.findAllByOrderByAssetName();
        } else {
            assets = assetRepository.findAssetByCategory(category);
            logger.info("Successfully got " + assets.size() + " Asset!");
        }
        return assets.stream().map(assetMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<AssetDTO> filterAssetByState(int state) {
        logger.info("Attempting to filter Asset with State " + state + "...");
        List<Asset> assets;
        if (state == 999) {
            assets = assetRepository.findAllByOrderByAssetName();
            logger.info("Successfully got " + assets.size() + " Asset!");
        } else {
            assets = assetRepository.findAssetByState(state);
            logger.info("Successfully got " + assets.size() + " Asset!");
        }
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
        String prefix = category.getPrefix();
        Integer maxId = assetRepository.getAssetMaxId(prefix);

        String assetCode = "";
        if (maxId == null) {
            assetCode = prefix + String.format("%06d", 1);
        } else {
            assetCode = prefix + String.format("%06d", maxId + 1);
        }
        return assetCode;
    }

    //  private String generateAssetCode(Category category) {
    //  String prefix = category.getPrefix();
    //  Integer count = assetRepository.count(category.getId()) + 1;
    //  String assetCode = prefix + String.format("%06d", count);
    //  return assetCode;
    //}
}
