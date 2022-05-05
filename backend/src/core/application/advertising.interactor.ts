import { AdvertisingAdapter } from "@domain/advertising/advertising.adapter";
import { BannerEntity } from "@domain/advertising/advertising.entity";
import { NotFoundError } from "routing-controllers";
import { Service, Inject } from "typedi";

@Service()
export class AdvertisingInteractor {
    constructor(@Inject("AdvertisingAdapter") private advertisingAdapter: AdvertisingAdapter) { };

    async createAdvertising(entry: BannerEntity[]) {
        return await Promise.all([...entry].map(async banner =>
            await this.advertisingAdapter.create(banner)));
    };

    async updateAdvertising(id: string, entry: BannerEntity) {
        const bannerInDB = await this.advertisingAdapter.getById(id);
        if (!bannerInDB) throw new NotFoundError();

        return await this.advertisingAdapter.update(id, entry);
    };

    async getAllAdvertisings() {
        return await this.advertisingAdapter.getAll();
    };

    async deleteAdvertising(id: string) {
        const bannerInDB = await this.advertisingAdapter.getById(id);
        if (!bannerInDB) throw new NotFoundError();

        return await this.advertisingAdapter.delete(id);
    };
}