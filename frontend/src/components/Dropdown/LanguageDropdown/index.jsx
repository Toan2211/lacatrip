import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageDropdown = () => {
    const { i18n } = useTranslation()
    const [selectedLanguage, setSelectedLanguage] = useState(() => i18n.language)

    const handleLanguageChange = language => {
        setSelectedLanguage(language)
        i18n.changeLanguage(language)
    }

    return (
        <div className="main-navbar__group lg:mr-5">
            <div className="sm-response relative group">
                <span className="el-dropdown-link uppercase switch-language font-bold text-sm el-dropdown-selfdefine flex items-center gap-1">
                    {selectedLanguage === 'en' ? (
                        <img
                            className="prefix rounded-full"
                            src="https://res.cloudinary.com/djgkj9nli/image/upload/v1688039131/en-flag-32x48_df8ws8.png"
                            width="20"
                            height="20"
                            alt="EN Flag"
                        />
                    ) : (
                        <img
                            className="prefix rounded-full"
                            src="https://res.cloudinary.com/djgkj9nli/image/upload/v1688039132/vi-flag-32x48_fpgcdb.png"
                            width="20"
                            height="20"
                            alt="Vietnamese Flag"
                        />
                    )}
                    <span className="leading-none block hiden-sm-screen text-sm">
                        {selectedLanguage === 'en' ? 'en' : 'vn'}
                    </span>
                </span>
                <ul className="dropdown-menu absolute hidden text-gray-700 bg-white py-2 px-2 rounded shadow-md group-hover:block left-[-30px] w-[160px]">
                    <li>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`${
                                selectedLanguage === 'en'
                                    ? 'bg-blue-500 text-white'
                                    : ''
                            } w-full py-2 px-4 text-left hover:bg-blue-200`}
                        >
                            English
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleLanguageChange('vn')}
                            className={`${
                                selectedLanguage === 'vn'
                                    ? 'bg-blue-500 text-white'
                                    : ''
                            } w-full py-2 px-4 text-left hover:bg-blue-200`}
                        >
                            Tiếng Việt
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LanguageDropdown
