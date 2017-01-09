module feng3d {

    /**
     * 标准材质
     * @author feng 2016-05-02
     * @see 物理渲染-基于物理的光照模型 http://blog.csdn.net/leonwei/article/details/44539217
     */
    export class StandardMaterial extends Material {

        public difuseTexture: Texture2D;

        /**
         * 基本颜色
         */
        public baseColor: Color = new Color(1, 1, 1, 1);

        /**
         * 反射率
         */
        public reflectance: number = 1.0;

        /**
         * 粗糙度
         */
        public roughness: number = 1.0;

        /**
         * 金属度
         */
        public metalic: number = 1.0;

        /**
         * 构建
         */
        constructor() {
            super();
            this.shaderName = "standard";
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext) {
            super.updateRenderData(renderContext);

            this.renderData.uniforms[RenderDataID.u_baseColor] = this.baseColor.toVector3D();
            this.renderData.uniforms[RenderDataID.u_reflectance] = this.reflectance;
            this.renderData.uniforms[RenderDataID.u_roughness] = this.roughness;
            this.renderData.uniforms[RenderDataID.u_metalic] = this.metalic;
        }
    }
}